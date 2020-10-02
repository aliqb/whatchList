export class ListItem{
    private poster:string;
    private title:string;
    private year:number;
    public desc:string;
    public watched:boolean
    constructor(poster:string,title:string,year:number,watched:boolean=false){
        this.poster=poster;
        this.title=title;
        this.year=year;
        this.watched=watched;

    }
}