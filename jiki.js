//自機関連


//弾クラス
class Tama extends CharaBase
{
  constructor(x,y,vx,vy)
  {
    super(5,x,y,vx,vy);
    //this.w = 4;
    //this.h = 6;
    this.r = 4;
  }

  update()
  {
    super.update();

    for(let i=0; i<teki.length ;i++)
    {
      if(!teki[i].kill)
      {
        if (checkHit(
          this.x, this.y, this.r,
          teki[i].x, teki[i].y, teki[i].r


        ))
        {
          teki[i].kill = true;
          this.kill=true;

          explosion(
            teki[i].x, teki[i].y,
            teki[i].vx>>3, teki[i].vy>>3);


          break;
        }
      }
    }
  }

  draw()
  {
    super.draw();
  }
}


//自機のクラス
class Jiki
{
  constructor()
  {
    this.x = (FIELD_W/2)<<8;
    this.y = (FIELD_H/2)<<8;
    this.speed  = 512;
    this.anime  = 0;
    this.reload = 0;
    this.relo2  = 0;
    this.r      = 10;
    this.damage = 0;
  }

  //自機の移動
  update()
  {
    if(this.damage)this.damage--;
    if(key['Space'] && this.reload == 0)
    {
      tama.push(new Tama(this.x+(4<<8), this.y-(10<<8), 0,-2000));
      tama.push(new Tama(this.x-(4<<8), this.y-(10<<8), 0,-2000));
      tama.push(new Tama(this.x+(8<<8), this.y-(10<<8), 400,-2000));
      tama.push(new Tama(this.x-(8<<8), this.y-(10<<8), -400,-2000));

      //tama.push(new Tama(this.x+(0<<8), this.y-(10<<8), 0,-1300));

      this.reload=4;
      if(++this.relo2 ==4)
      {
        this.reload=20;
        this.relo2=0;
      }
    }
    if( !key['Space']) this.reload = this.relo2=0;

    if(this.reload>0) this.reload--;

    if(key['ArrowLeft'] && this.x>this.speed)
    {
      this.x-=this.speed;
      if(this.anime>-8)this.anime--;
    }
    else if(key['ArrowRight'] && this.x<= (FIELD_W<<8)-this.speed)
    {
      this.x+=this.speed;
      if(this.anime<8)this.anime++;
    }
    else
    {
      if(this.anime>0) this.anime--;
      if(this.anime<0) this.anime++;
    }
    if(key['ArrowUp'] && this.y>this.speed)this.y-=this.speed;
    
    if(key['ArrowDown'] && this.y<= (FIELD_H<<8)-this.speed)this.y+=this.speed;
  }
//自機の描画
  draw()
  {
    drawSprite(2 + (this.anime>>2), this.x, this.y);
  }
}