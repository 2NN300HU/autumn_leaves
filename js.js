const canvas = document.getElementById("tree"); 
const ctx = canvas.getContext("2d"); 

const canvas2 = document.getElementById("leaf"); 
const ctx2 = canvas2.getContext("2d"); 

canvas.width =  document.documentElement.clientWidth-20;
canvas.height =  document.documentElement.clientHeight-20;


canvas2.width =  document.documentElement.clientWidth-20;
canvas2.height =  document.documentElement.clientHeight-20;



let x =canvas.width/2,y = canvas.height;

let abx, aby,abr;

let leafs = [];



let counter  = 0;
let wind = 0;
class leaf{
    constructor(tr){
        this.tr = tr
        this.x= 0;
        this.y = 0;
        // this.rad = rad;
        this.vx = 0;
        this.color = "green";
        this.size = 0.9+Math.random()*0.2;
        // this.size = 0.9;
        this.stage = 0;
        this.cur = 0;
        this.count = 0;
    }
    
    step(params) {
        if(this.stage<4&& Math.random() < this.cur){
            this.cur = 0
            this.stage++;
        }else{
            this.cur+=0.005;
        }
        switch (this.stage){
            case 0: // green
                break;
            case 1: //yellow
            case 2:
            case 3:
                this.color = "yellow";
                break;

            case 4: // fall
                this.count+=1;
                this.x +=this.vx+wind;
                this.y += Math.min(this.count*this.count , y/7)
                // console.log(this.y);
                
                if(this.tr.f+this.y > y+y/20){
                    this.y = y+y/20 - this.tr.f;
                    console.log(this.tr.f);
                    this.stage++;
                }
                break;

            case 5: //fallen
                this.color = "brown";
                break;
        }
        this.draw();


    }

    make(){
        ctx2.beginPath();
        let w = y/15-y/15/100*15*2*3, h = y/3.5 - y/3.5/100*15*3;
        h/=6;
        w/=2;
        ctx.moveTo(w/2,w/2);

        ctx2.lineTo(-w/2,w/2);
        ctx2.lineTo(-w/2,-h-w/2);
        ctx2.lineTo(-w/2-h*2,-h-w/2-h);
        ctx2.lineTo(-w/2-h,-h-w/2-h*2);


        ctx2.lineTo(-2.5,-h-w/2-h*2);
        ctx2.lineTo(0,-h-w/2-h*2+10);

        ctx2.lineTo(2.5,-h-w/2-h*2);


        ctx2.lineTo(w/2+h,-h-w/2-h*2);
        ctx2.lineTo(w/2+h*2,-h-w/2-h);

        ctx2.lineTo(w/2,-h-w/2);
        ctx2.lineTo(w/2,w/2);
    }
    draw(){
    ctx2.resetTransform();  
// console.log(this.tr);
        ctx2.translate(this.x,this.y);
          // 
        ctx2.transform(this.tr.a,this.tr.b,this.tr.c,this.tr.d,this.tr.e,this.tr.f);
        ctx2.fillStyle = this.color;
        ctx2.strokeStyle = "black";


        ctx2.scale(this.size, this.size);
        ctx2.rotate(((-15+30*Math.random())*Math.PI)/180);
        this.make();
        ctx2.fill();

        this.make();
        ctx2.stroke();
        // ctx2.fillStyle="black";
        // ctx2.fillRect(0,0,3, 3);


    }
}

function body(w,h,rad,c){
    counter++
    if(c>4) return;
    let decay = 15;
    ctx.fillStyle = "#5C4033";
    ctx.rotate((rad*Math.PI)/180);
    // abr +=rad;


    // console.log(abx,aby,abr);
    ctx.beginPath();
    ctx.moveTo(w/2,w/2);
    ctx.lineTo(-w/2,w/2);
    ctx.lineTo(-w/2+w/100*decay,-h-w/2+w/100*decay);
    ctx.lineTo(w/2-w/100*decay,-h-w/2+w/100*decay);
    ctx.lineTo(w/2,w/2);
    ctx.fill();
    // ctx.fillStyle="black";
    // ctx.fillRect(0,0,3, 3);
    for(let i  =  0 ; i < 4; i ++){
        ctx.translate(0,-h/4);
        ctx.rotate((90*Math.PI)/180)
        leafs.push(new leaf(ctx.getTransform()));
        ctx.rotate((180*Math.PI)/180)
        leafs.push(new leaf(ctx.getTransform()));
        ctx.rotate((90*Math.PI)/180)
    }

    // aby-=h*Math.cos((abr*Math.PI)/180);
    // abx-=h*Math.sin((abr*Math.PI)/180);

    // ctx.fillRect(0, 0, 3, 3);

    let st = -70-10;
    if(c==0) st=-50;
    for(let i =0 ; i<2;i++){
        if(st>80) break;
        st+=Math.random()*60+30;
        if(st>80) st = 80;
        body(w-w/100*decay*2,h-h/100*decay,st,c+1);
    }
    ctx.translate(0,h);
    // aby+=h*Math.cos((abr*Math.PI)/180);
    // abx+=h*Math.sin((abr*Math.PI)/180);

    ctx.rotate(-(rad*Math.PI)/180);
    // abr-=rad
}


// abx = -y/6;
// aby = y*3/4;
// abr = 0;
// console.log(abx,aby,abr);

// ctx.translate(0,5);
// ctx.rotate(90*Math.PI/180);
// console.log(ctx.getTransform())

// ctx.translate(0,5);

// ctx.rotate(90*Math.PI/180);
// console.log(ctx.getTransform())
// ctx.translate(0,5);

// ctx.rotate(90*Math.PI/180);
// console.log(ctx.getTransform())


ctx.translate(-y/6,y*3/4);
body(y/15,y/3.5,0,0);
// body(y/15,y/3.5,0,0);



ctx.translate(0,-y/4);
// aby-=y/4;
body(y/15,y/3.5,0,0);


ctx2.resetTransform();
wind+=Math.random()*10-5;
ctx2.clearRect(0, 0, x*2,y);
leafs.forEach((element)=>(element.step()));

setInterval(() => {
    ctx2.resetTransform();

    wind+=Math.random()*10-5;
    ctx2.clearRect(0, 0, x*2,y);
    leafs.forEach((element)=>(element.step()));
}, 500);


