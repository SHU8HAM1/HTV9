import os
##################################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the URL
# of the image we want as an input. Change these strings to run your own example.
#################################################################################################

CLARIFAI = "key"

PAT = CLARIFAI
# Specify the correct user_id/app_id pairings
# Since you're making inferences outside your app's scope
USER_ID = 'clarifai'
APP_ID = 'main'


AWS_ACCESS_KEY = "key"
AWS_SECRET_KEY = "key"
####################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the URL
# of the image we want as an input. Change these strings to run your own example.
#################################################################################################

import boto3


# Change these to whatever model and image URL you want to use
MODEL_ID = 'food-item-recognition'
MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044'
############################################################################
# YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
############################################################################

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2


def get_ingredients(username, s3_key):
    IMAGE_URL = f"https://fridge-food-images.s3.ca-central-1.amazonaws.com/{s3_key}"

    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    metadata = (('authorization', 'Key ' + PAT),)

    userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
            model_id=MODEL_ID,
            version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        image=resources_pb2.Image(
                            url=IMAGE_URL
                        )
                    )
                )
            ]
        ),
        metadata=metadata
    )
    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

    # Since we have one input, one output will exist here
    output = post_model_outputs_response.outputs[0]


    dynamodb = boto3.resource('dynamodb',
                          aws_access_key_id=AWS_ACCESS_KEY,
                          aws_secret_access_key=AWS_SECRET_KEY,
                          region_name="ca-central-1",
                          endpoint_url="https://dynamodb.ca-central-1.amazonaws.com")
    
    table = dynamodb.Table("fridge-list")

    food_list = []

    out = ""
    for concept in output.data.concepts:
        food_list.append(concept.name)
        out += ("%s, " % (concept.name))
    
    response = table.update_item(
            Key={'user':  username},
            UpdateExpression='SET ingredients = :new_list',  # Specify the update expression
            ExpressionAttributeValues={
                ':new_list': food_list  # New value for the age attribute
            },
            ReturnValues='UPDATED_NEW'  # Return the new value of the updated attributes
        )
    
    return out
