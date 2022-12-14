# Generated by Django 4.1.3 on 2022-12-03 04:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecourts_api', '0003_rename_additional_petitioner_additional_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Documents',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_type', models.CharField(max_length=50, null=True)),
                ('display_name', models.CharField(max_length=512, null=True)),
                ('document', models.CharField(max_length=256, null=True)),
                ('case_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecourts_api.casedetails')),
            ],
        ),
    ]
