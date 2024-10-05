from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def upload(request):
    query = request.GET.get('q', '')  # Get the search query parameter
    results = proccess_upload(query)  # Implement your search logic here
    return Response({'results': results}, status=status.HTTP_200_OK)

def proccess_upload(query):
    # Implement your search logic here
    # This is a dummy example returning static data
    return [{"Hello": 123}]
