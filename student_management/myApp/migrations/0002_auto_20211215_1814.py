# Generated by Django 3.2.2 on 2021-12-15 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subject',
            name='subject_id',
        ),
        migrations.AddField(
            model_name='markslist',
            name='semister',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'), ('8', '8')], default='', max_length=1),
            preserve_default=False,
        ),
    ]
