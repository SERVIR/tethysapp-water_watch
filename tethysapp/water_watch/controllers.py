from django.shortcuts import render
from utilities import *

def home(request):
    """
    Controller for the app home page.
    """
    ponds = initLayers()

    context = {
        'ponds_mapid':ponds['mapid'],
        'ponds_token':ponds['token']
    }

    return render(request, 'water_watch/home.html', context)
