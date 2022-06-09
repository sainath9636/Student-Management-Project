# Generated by Django 4.0.3 on 2022-03-20 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0004_auto_20220228_1659'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaves',
            name='status',
            field=models.CharField(choices=[('PENDING', 'PENDING'), ('APPROVED', 'APPROVED'), ('REJECTED', 'REJECTED')], default='PENDING', max_length=50),
        ),
        migrations.AlterField(
            model_name='student',
            name='profile',
            field=models.ImageField(null=True, upload_to='profiles/students'),
        ),
    ]