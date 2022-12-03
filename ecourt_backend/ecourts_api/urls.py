from django.urls import path, include
from ecourts_api import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path(r'case-entry', views.case_details),
    path(r'upload-docs', views.uploadDocuments),
    path(r'get-cases', views.cases),
    path(r'get-causelist', views.cause_list)
]