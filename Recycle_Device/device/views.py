from django.shortcuts import render
from .models import Mobile

# Create your views here.
def index(request):
    a=Mobile.objects.values()

    context={
        'mycompany':a
    }
    return render(request,'index.html',context)

def devices(request,cpy):
    a=Mobile.objects.filter(company=cpy).values()
    print(a)
    context={
        'device':a
    }
    return render(request,'devices.html',context )

def info(request,my_id):
    a=Mobile.objects.filter(id=my_id).values()
    print(a)
    context={
        'device':a
    }
    return render(request,'info.html',context )

def predict(request):
    return render(request,'pred.html')