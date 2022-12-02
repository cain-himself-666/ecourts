# Generated by Django 4.1.3 on 2022-12-02 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecourts_api', '0002_rename_petitioner_counsel_advocates_counsel_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='additional',
            old_name='additional_petitioner',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='additional',
            name='additional_respondent',
        ),
        migrations.AddField(
            model_name='additional',
            name='type',
            field=models.CharField(max_length=2, null=True),
        ),
    ]
