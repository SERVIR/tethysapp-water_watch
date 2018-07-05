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
        )

        return url_maps
