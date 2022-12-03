from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from ecourts_api import models
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def cases(request):
    if request.method == 'GET':
        response = []
        cases = models.CaseDetails.objects.all()
        for c in cases:
            data = {
                'id': c.id,
                'case_no': c.case_no
            }
            response.append(data)
        return JsonResponse(response, status=status.HTTP_200_OK, safe=False)
    
    if request.method == 'POST':
        models.CauseList.objects.create(
            display_s_no = request.POST['sno'],
            display_name = request.POST['name'],
            date = request.POST['date'],
            case_id_id = request.POST['case_id']
        )
        return JsonResponse({'response': 'Data Added Successfully'}, status=status.HTTP_201_CREATED)
    
@csrf_exempt
def cause_list(request):
    if request.method == 'GET':
        cause_list = []
        pet_counsel = []
        res_counsel = []
        cases = models.CauseList.objects.filter(date = request.GET['date']).select_related('case_id').order_by('date')
        for c in cases:
            case_id = c.case_id.id
            counsels = models.Advocates.objects.filter(case_id_id = case_id)
            for co in counsels:
                if co.counsel_for == 'p':
                    p_data = {
                        "name": co.counsel_name
                    }
                    pet_counsel.append(p_data)
                else:
                    r_data = {
                        "name": co.counsel_name
                    }
                    res_counsel.append(r_data)
            data = {
                "case_no": c.case_id.case_no,
                "first_petitioner": c.case_id.first_petitioner,
                "first_respondent": c.case_id.first_respondent,
                "petitioner_counsels": pet_counsel,
                "respondent_counsels": res_counsel,
            }
            cause_list.append(data)
        print(cause_list)
        

        # for c in cases:
        #     data = {
        #         'id': c.id,
        #         'case_no': c.case_no
        #     }
        #     response.append(data)
        # return JsonResponse(response, status=status.HTTP_200_OK, safe=False)