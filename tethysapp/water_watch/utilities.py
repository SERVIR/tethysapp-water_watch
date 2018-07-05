import ee
from ee.ee_exception import EEException
from config import ponds_asset

try:
    ee.Initialize()
except EEException as e:
    from oauth2client.service_account import ServiceAccountCredentials
    credentials = ServiceAccountCredentials.from_p12_keyfile(
    service_account_email='',
    filename='',
    private_key_password='notasecret',
    scopes=ee.oauth.SCOPE + ' https://www.googleapis.com/auth/drive ')
    ee.Initialize(credentials)

ponds = ee.FeatureCollection(ponds_asset)

visParams = {'min': 0, 'max': 2, 'palette': 'red,yellow,green'}

pondsImgID = ponds.getMapId(visParams)

def initLayers():
    return pondsImgID

