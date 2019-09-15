




import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ServiceProvider {


    api_url = "http://demo.vthinksolution.com/crictest/cric/services/";
    //api_url = "http://nplcric.in/cric/services/"; 
    //api_url="http://demo.vthinksolution.com/cricket/cric/services/"
    resultData: any;
    Series: any;
    refresh_no: any;
    type = 'npl'
    constructor(public http: Http, public http1: HttpClient) {


    }

    /*******************************Live Score Service Start*************************/
    getlivescore(): any {


        this.Series = window.localStorage.getItem("series");

        const url = `${this.api_url}get_live_matchdata.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /*******************************Live Score Service End*************************/
    /*******************************Youtube ID Service Start*************************/
    getyoutubeid(): any {


        this.Series = window.localStorage.getItem("series");

        const url = `${this.api_url}youtubeid_refresh.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /*******************************Youtube ID Service End*************************/
    /*******************************Sponsor info Service Start*************************/
    getsponsorinfo(): any {

        const url = `${this.api_url}sponsorurl.php?type=` + this.type;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Sponsor info Service End*************************/



    /*******************************Players Service Start*************************/
    getPlayers(): any {

        this.Series = window.localStorage.getItem("series")

        const url = `${this.api_url}get_all_players_list2017.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Players Service End*************************/

    /*******************************Players Info Service Start*************************/
    getplayerinfo(id): any {


        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}player_info.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);
        data.append('player_id', id);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Players Info Service End*************************/

    /*******************************Matcheslist Service Start*************************/
    getmatcheslist(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_matches_list.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Matches list Service End*************************/

    /*******************************Schedule Service Start*************************/
    getschedule(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_schedule_data.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Schedule Service End*************************/

    /*******************************Scoreboard Service Start*************************/
    getdata(id): any {


        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}getdata.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);
        data.append('match_id', id);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Scoreboard Service End*************************/


    /******************************* GALLERY DETAIL Service Start*************************/
    getgalleryimagedata(id): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_gallery.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* GALLERY DETAIL Service End*************************/
    /*******************************Teams List Service Start*************************/
    getteams(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_team_list.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /*******************************Teams List Service End*************************/

    /*******************************Teams Details Service Start*************************/
    getteamsdetails(id): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_players_team.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('team_id', id);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Teams Details Service End*************************/

    /*******************************Committee Service Start*************************/
    getCommittee(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_commitie_members.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Committee Service End*************************/

    /*******************************Committee Details Service Start*************************/
    getCommitteedetails(id): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}single_commitie_members.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('id', id);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Committee Details Service End*************************/

    /*******************************Most Runs Service Start*************************/
    getmostruns(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_runs.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Runs Service End*************************/

    /*******************************Most Wickets Service Start*************************/
    getmostwickets(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_wickets.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Wickets Service End*************************/

    /*******************************Most Fifties Service Start*************************/
    getmostfifties(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_fifties.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Fifties Service End*************************/
    /*******************************Most Hundreds Service Start*************************/
    getmosthundreds(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_hundreds.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Hundreds Service End*************************/

    /*******************************Most Fours Service Start*************************/
    getmostfours(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_fours.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Fours Service End*************************/

    /*******************************Most Sixes Service Start*************************/
    getmostsixes(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_sixes.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Sixes Service End*************************/

    /*******************************Most Indscore Service Start*************************/
    getmostindscore(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_indscore.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Indscore Service End*************************/

    /*******************************Most Obfigures Service Start*************************/
    getmostobfigures(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_most_obfigures.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Most Obfigures Service End*************************/
    /*******************************Sponsor Service Start*************************/
    getsponsor(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_sponsor.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /*******************************Sponsor Service End*************************/

    /*******************************Sponsor Details Service Start*************************/
    getsponsordetails(id): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_sponsor_detail.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);
        data.append('s_id', id);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /******************************* Sponsor Details Service End*************************/


    /*******************************Live Bidding Service Start*************************/
    getLiveBiddingData(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_live_bidding.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /*******************************Live Bidding Service End*************************/
    /*******************************All Bidding Data  Service Start*************************/
    getAllBiddingData(page): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_all_bidding.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);
        data.append('page', page);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }
    /*******************************All Bidding Data  Service End*************************/

    /*******************************Points  Service End*************************/
    getpoints(): any {

        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_ranking.php`;

        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }

    /*******************************Points  Service End*************************/

    /*******************************Get image  Service End*************************/


    getimage(): any {
        this.Series = window.localStorage.getItem("series");
        const url = `${this.api_url}get_image.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('series', this.Series);

        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }

    /*******************************Get image  Service End*************************/

    /*******************************register  Service End*************************/
    register(token): any {


        const url = `${this.api_url}ionregister.php`;
        let data = new URLSearchParams();
        data.append('refresh', this.refresh_no);
        data.append('user', 'user_' + Math.random());
        data.append('type', 'android');
        data.append('device_id', token);
        data.append('version', '1.9.4');
        data.append('series', 'npl2018');


        return this.http.post(url, data)
            .map(
                (response) => response.json()
            )
    }

    /*******************************register  Service End*************************/
}
