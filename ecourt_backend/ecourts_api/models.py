from django.db import models

# Create your models here.
class CaseDetails(models.Model):
    case_no = models.CharField(unique=True, max_length=20, null=False)
    cnr = models.CharField(max_length=30, null=False)
    first_petitioner = models.CharField(max_length=50, null=False)
    first_respondent = models.CharField(max_length=50, null=False)

class Advocates(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    counsel_name = models.CharField(max_length=128, null=True)
    counsel_for = models.CharField(max_length=2, null=True)

class Additional(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, null=True)
    type = models.CharField(max_length=2, null=True)
