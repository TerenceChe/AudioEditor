from .models import AudioData
from .serializers import AudioSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def audioList(request, format=None):
    if request.method == 'GET':
        audios = AudioData.objects.all()
        serializer = AudioSerializer(audios, many = True)
        return Response(serializer.data)

    if request.method == 'POST':
        # request.data shuold be an audio file that we convert to json of words, and a file path or actual file
        serializer = AudioSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

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
