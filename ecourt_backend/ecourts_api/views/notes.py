from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from ecourts_api import models
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def addNotes(request):
    if request.method == 'POST':
        models.Notes.objects.create(
            note = request.POST['note'],
            case_id_id = request.POST['case_id'],
            document_id_id = request.POST['document_id']
        )
        return JsonResponse({'response': 'Note Added Successfully'}, status=status.HTTP_201_CREATED)
    return JsonResponse({'response': 'Error'}, status=status.HTTP_400_BAD_REQUEST)
    