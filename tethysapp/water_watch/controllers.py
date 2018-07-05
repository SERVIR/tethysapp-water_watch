from django.shortcuts import render
from tethys_sdk.gizmos import MapView, Button

def home(request):
    """
    Controller for the app home page.
    """

    water_watch_map = MapView(
        height='100%',
        width='100%',
        layers=[],
        basemap='OpenStreetMap',
    )

    context = {
        'water_watch_map': water_watch_map
    }

    return render(request, 'water_watch/home.html', context)
