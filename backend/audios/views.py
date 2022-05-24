from .models import AudioData
from .serializers import AudioSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import os
from google.cloud import speech
from dotenv import load_dotenv

@api_view(['GET', 'POST'])
def audioList(request, format=None):
    if request.method == 'GET':
        audios = AudioData.objects.all()
        serializer = AudioSerializer(audios, many = True)
        return Response(serializer.data)

    if request.method == 'POST':
        # request.data shuold be an audio file that we convert to json of words, and a file path or actual file
        # serializer = AudioSerializer(data = request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(request.data)
        handleFile(request.FILES['file'])
        return Response(status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def audioDetail(request, id, format=None):
    try:
        audio = AudioData.objects.get(pk=id)
    except AudioData.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AudioSerializer(audio)
        return Response(serializer.data)
    if request.method == 'PUT':
        pass
    if request.method == 'DELETE':
        pass

def handleFile(file):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/coding/audio-editor-key.json'
    speechClient = speech.SpeechClient()

    print("a")

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
        # whole transcript
        print("Transcript: {}".format(alternative.transcript))
        # confidence level
        # print("Confidence: {}".format(alternative.confidence))

        for word_info in alternative.words:
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time

            print(
                f"Word: {word}, start_time: {start_time.total_seconds()}, end_time: {end_time.total_seconds()}"
            )

        print(alternative.words)