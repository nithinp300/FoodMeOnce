import urllib.request, json

def getJsonFromUrl(url):
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read())
        return data

if __name__ == "__main__":
    url = "https://api.census.gov/data/2018/acs/acs1?get=NAME,group(B01001)&for=us:1"
    getJsonFromUrl(url)