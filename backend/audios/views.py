from .models import AudioData
from .serializers import AudioSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import FileResponse
from pydub import AudioSegment
import os
from google.cloud import speech

@api_view(['GET', 'POST'])
def audioList(request, format=None):
    if request.method == 'GET':
        audios = AudioData.objects.all()
        serializer = AudioSerializer(audios, many = True)
        return Response(serializer.data)

    if request.method == 'POST':
        # request.data shuold be an audio file that we convert to json of words, and a file path or actual file
        data = handleFile(request.FILES['file'])
        # serializer = AudioSerializer(data = data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(data = data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def newAudio(request, format = None):
    if request.method =='POST':
        print(type(request.FILES['file']))
        audio = AudioSegment.from_file(request.FILES['file'], "mp3")
        times = request.POST.getlist('times')
        wholeAudio = None
        for i in range(len(times)):
            times[i] = times[i].split(',')
            times[i][0] = float(times[i][0])
            times[i][1] = float(times[i][1])
            extracted = audio[times[i][0]*1000:times[i][1]*1000]
            if wholeAudio == None:
                wholeAudio = extracted
            else:
                wholeAudio += extracted
        print(times)
        wholeAudio.export("newAudio.mp3", format = "mp3")
    return FileResponse(open("newAudio.mp3", "rb"))


# @api_view(['GET', 'PUT', 'DELETE'])
# def audioDetail(request, id, format=None):
#     try:
#         audio = AudioData.objects.get(pk=id)
#     except AudioData.DoesNotExist:
#         return Response(status = status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = AudioSerializer(audio)
#         return Response(serializer.data)
#     if request.method == 'PUT':
#         pass
#     if request.method == 'DELETE':
#         pass

def handleFile(file):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/coding/audio-editor-key.json'
    speechClient = speech.SpeechClient()

    byteData = file.read()
    audio = speech.RecognitionAudio(content=byteData)

    # configure files

    config = speech.RecognitionConfig(
        sample_rate_hertz=48000,
        language_code='en-US',
        enable_word_time_offsets=True,
        enable_automatic_punctuation=True
    )

    # transcribe objets
    result = speechClient.recognize(config=config, audio=audio)

    for result in result.results:
        alternative = result.alternatives[0]
        data = {}
        for i in range(len(alternative.words)):
            word_info = alternative.words[i]
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time
            data[i] = [word, start_time.total_seconds(), end_time.total_seconds()]

        return data

def modifyAudio(file, list):
    byteData = file.read()
    print(list)
