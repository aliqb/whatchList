export class ListItem{
    public poster:string;
    public title:string;
    public year:number;
    public id:string;
    public desc:string;
    public watched:boolean
    constructor(poster:string,title:string,year:number,id:string,watched:boolean=false){
        this.poster=poster;
        this.title=title;
        this.year=year;
        this.id=id;
        this.watched=watched;

    }
}