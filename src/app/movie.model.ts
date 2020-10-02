interface Rating{
    source:String,
    value:string,
}
export class Movie{
    
    // constructor(
        // public title:string,
        // public year:number,
        // public rated:string,
        // public runTime:string,
        // public genre:string,
        // public director:string,
        // public writer:string,
        // public actors:string,
        // public plot:string,
        // public language:string,
        // public counry:string,
        // public awards:string,
        // public poster:string,
        // public rating:Rating[],
        // public id:string,
        // public type:string,

    // ){}
    public title:string;
    public year:number;
    public rated:string;
    public runTime:string;
    public genre:string;
    public director:string;
    public writer:string;
    public actors:string;
    public plot:string;
    public language:string;
    public country:string;
    public awards:string;
    public poster:string;
    public rating:Rating[];
    public id:string;
    public type:string;
    constructor({
        
         title='',
         year=0,
         rated='',
         runTime='',
         genre='',
         director='',
         writer='',
         actors='',
         plot='',
         language='',
         country='',
         awards='',
         poster='',
         rating=[],
         id='',
         type=''
    }){
        this.title=title,
        this.year=year,
        this.rated=rated;
        this.runTime=runTime;
        this.genre=genre;
        this.director=director;
        this.writer=writer;
        this.actors=actors;
        this.plot=plot;
        this.language=language;
        this.country=country;
        this.awards=awards;
        this.poster=poster;
        this.rating=rating;
        this.id=id;
        this.type=type;
    }
}
