from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from ecourts_api import models
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getDocTypes(request):
    if request.method == 'GET':
        doc_types = list(models.DocumentMaster.objects.all())
        return JsonResponse(doc_types, status=status.HTTP_200_OK, safe=False)