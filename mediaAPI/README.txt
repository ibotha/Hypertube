*** FILE TO BE UPDATED! ***

README FOR WEBTORRET MEDIA API

API Routes:

    POST: '/torrent/download/'
        BODY:
        {
            torrentLink: {
                required: true,
                type: String,
                expectedInfo: infoHash / magnetLink / torrentFileURL
            },
            lengthInSeconds: {
                required: false (optional),
                type: Number,
            },
            lengthInMinutes: {
                required: false (optional),
                type: Number
            }
        }
        EXAMPLE RESPONSE:
        {
            "movieID": "5c516f387943ec37a9b6a093",
            "infoHash": "08ada5a7a6183aae1e09d831df6748d566095a10",
            "moviePath": "Sintel/Sintel.mp4",
            "status": "STARTED",
            "expires": 1551432762231,
            "subtitles": [],
            "movieStats": {
                "length": 129241752,
                "type": "mp4",
                "duration": 1260
            }
        }
    
    GET: '/torrent/stream/:movieID'
        PARAMS:
        {
            movieID: {
                required: true,
                type: Plain
            }
        }

        EXAMPLE CALL:{
            GET '/torrent/stream/5c516f387943ec37a9b6a093'
        }

        EXAMPLE POSSIBILITIES:{
            JSON ( ON ERROR / MOVIE NOT READY ),
            MEDIA STREAM ( FETCHED VIA RANGE REQUESTS -- BUILT IN TO HTML5 VIDEO TAG)
        }