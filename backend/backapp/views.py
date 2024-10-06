from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import boto3
import requests
import os


AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')



@api_view(['GET'])
def upload(request):
    weight = request.GET.get('w', '')  # Get the search query parameter
    ingredient_s3 = request.GET.get('i', '')
    results = proccess_upload(weight)  # Implement your search logic here
    
    return Response({'results': results}, status=status.HTTP_200_OK)





def proccess_upload(query):
    # Implement your search logic here
    # This is a dummy example returning static data
    dynamodb = boto3.resource('dynamodb',
                          aws_access_key_id=AWS_ACCESS_KEY,
                          aws_secret_access_key=AWS_SECRET_KEY,
                          region_name="ca-central-1",
                          endpoint_url="https://dynamodb.ca-central-1.amazonaws.com")
    
    table = dynamodb.Table("fridge-list")
    item = {
        "user": "gargshubham2005",
        "food": []
    }
    response = table.put_item(Item=item)

    return response
