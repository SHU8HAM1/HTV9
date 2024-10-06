from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import boto3
import requests
import os
from .api_call import *
from .computer_vision import *



AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')



@api_view(['GET'])
def upload(request):
    profile = request.GET.get('q', '')  # Get the search query parameter
    results = proccess_upload(profile)  # Implement your search logic here
    
    return Response({'results': results}, status=status.HTTP_200_OK)



def proccess_upload(profile):


    queries = profile.split("&")

    # Implement your search logic here
    # This is a dummy example returning static data
    dynamodb = boto3.resource('dynamodb',
                          aws_access_key_id=AWS_ACCESS_KEY,
                          aws_secret_access_key=AWS_SECRET_KEY,
                          region_name="ca-central-1",
                          endpoint_url="https://dynamodb.ca-central-1.amazonaws.com")
    
    table = dynamodb.Table("fridge-list")
    item = {
        "user": queries[2],
        "fname": queries[0],
        "lname": queries[1],
        "weight": queries[3],
        "ingredients": []
    }
    response = table.put_item(Item=item)

    ingredients = get_ingredients(queries[2], queries[4])

    answer = get_recipe(queries[3], ingredients)

    result = answer.split("Ingredients")
    temp = result[1].split("Instructions")
    result[1] = temp[0]
    result[2] = temp[1]
    steps = []
    j = 0
    for i in result[2].strip():
        if i in "1234567890":
            steps.append("" + i)
        steps[j] += i

    return result

queries = "shubham&garg&hello@gmail.com&max&fridge.jpg"
print(proccess_upload(queries))
