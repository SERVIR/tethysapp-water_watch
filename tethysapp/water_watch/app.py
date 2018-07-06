from tethys_sdk.base import TethysAppBase, url_map_maker


class WaterWatch(TethysAppBase):
    """
    Tethys app class for Water Watch.
    """

    name = 'Water Watch'
    index = 'water_watch:home'
    icon = 'water_watch/images/icon.gif'
    package = 'water_watch'
    root_url = 'water-watch'
    color = '#2c3e50'
    description = 'View data from the ponds in Ferlo area'
    tags = 'Hydrology'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='water-watch',
                controller='water_watch.controllers.home'
            ),
            UrlMap(
                name='timeseries',
                url='water-watch/timeseries',
                controller='water_watch.ajax_controllers.timeseries'
            ),
            UrlMap(
                name='forecast',
                url='water-watch/forecast',
                controller='water_watch.ajax_controllers.forecast'
            ),
            UrlMap(
                name='mnwdi',
                url='water-watch/mndwi',
                controller='water_watch.ajax_controllers.mndwi'
            ),
            UrlMap(
                name='getPonds',
                url='water-watch/api/getPonds',
                controller='water_watch.api.api_get_ponds'
            ),
            UrlMap(
                name='getTimeseries',
                url='water-watch/api/getTimeseries',
                controller='water_watch.api.api_get_timeseries'
            ),
        )

        return url_maps
