# Generated by Django 4.1.3 on 2022-12-03 09:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecourts_api', '0005_alter_documents_document_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='CauseList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_s_no', models.CharField(max_length=5)),
                ('display_name', models.CharField(max_length=2048, null=True)),
                ('date', models.DateField(default=None)),
                ('case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecourts_api.casedetails')),
            ],
        ),
    ]