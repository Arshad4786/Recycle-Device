from django.db import models

# Create your models here.
class Mobile(models.Model):
    id=models.AutoField
    company=models.CharField(max_length=50)
    name=models.CharField(max_length=100)
    img=models.ImageField(upload_to="images",default=" ")

    def __str__(self):
        return self.name