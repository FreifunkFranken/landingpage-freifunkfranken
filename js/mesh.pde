/* 
 PROCESSINGJS.COM HEADER ANIMATION  
 MIT License - F1lT3R/Hyper-Metrix
 Native Processing Compatible 
 */

int canvas_width = window.innerWidth;
int canvas_height = window.innerHeight;

int canvas_size = int((canvas_width+canvas_height)/2);

// Set number of circles
int count = 20;
float speed = 0.2;
// Set maximum and minimum circle size
int maxSize = int(canvas_size*0.15);
int minSize = int(canvas_size*0.05);
int maxDistance = int(canvas_size*0.3);
// Build float array to store circle properties
float[][] e = new float[count][5];
// Set size of dot in circle center
float ds=1;
// Set drag switch to false
boolean dragging=false;
// integers showing which circle (the first index in e) that's locked, and its position in relation to the mouse
int lockedCircle; 
int lockedOffsetX;
int lockedOffsetY;
// If user presses mouse...
void mousePressed () {
  // Look for a circle the mouse is in, then lock that circle to the mouse
  // Loop through all circles to find which one is locked
  for (int j=0;j< count;j++) {
    // If the circles are close...
    if (sq(e[j][0] - mouseX) + sq(e[j][1] - mouseY) < sq(e[j][2]/2)) {
      // Store data showing that this circle is locked, and where in relation to the cursor it was
      lockedCircle = j;
      lockedOffsetX = mouseX - (int)e[j][0];
      lockedOffsetY = mouseY - (int)e[j][1];
      // Break out of the loop because we found our circle
      dragging = true;
      break;
    }
  }
}
// If user releases mouse...
void mouseReleased() {
  // ..user is no-longer dragging
  dragging=false;
}

// Set up canvas
void setup() {
  // Frame rate
  frameRate(60);
  // Size of canvas (width,height)
  size(canvas_width, canvas_height);
  // Stroke/line/border thickness
  strokeWeight(1);
  // Initiate array with random values for circles
  for (int j=0;j< count;j++) {
    e[j][0]=random(width); // X 
    e[j][1]=random(height); // Y
    e[j][2]=random(minSize, maxSize); // Radius        
    e[j][3]=random(-speed, speed); // X Speed
    e[j][4]=random(-speed, speed); // Y Speed
  }
}

// Begin main draw loop (called 25 times per second)
void draw() {
  // Fill background black
  background(255);
  // Begin looping through circle array
  for (int j=0;j< count;j++) {
    // Disable shape stroke/border
    noStroke();
    // Cache diameter and radius of current circle
    float radi=e[j][2];
    float diam=maxDistance; //radi/2;
    if (sq(e[j][0] - mouseX) + sq(e[j][1] - mouseY) < sq(e[j][2]/2))
      fill(255, 180, 0, 100); // green if mouseover
    else
      fill(220, 0, 103, 100); // regular
    if ((lockedCircle == j && dragging)) {
      // Move the particle's coordinates to the mouse's position, minus its original offset
      e[j][0]=mouseX-lockedOffsetX;
      e[j][1]=mouseY-lockedOffsetY;
    }
    // Draw circle
    ellipse(e[j][0], e[j][1], radi, radi);
    // Move circle
    e[j][0]+=e[j][3];
    e[j][1]+=e[j][4];


    /* Wrap edges of canvas so circles leave the top
     and re-enter the bottom, etc... */
    if ( e[j][0] < -diam      ) { 
      e[j][0] = width+diam;
    } 
    if ( e[j][0] > width+diam ) { 
      e[j][0] = -diam;
    }
    if ( e[j][1] < 0-diam     ) { 
      e[j][1] = height+diam;
    }
    if ( e[j][1] > height+diam) { 
      e[j][1] = -diam;
    }

    // If current circle is selected...
    if ((lockedCircle == j && dragging)) {
      // Set fill color of center dot to white..
      fill(255, 255, 255, 255);
      // ..and set stroke color of line to green.
      stroke(128, 255, 0, 100);
    } 
    else {            
      // otherwise set center dot color to black.. 
      fill(0, 0, 0, 255);
      // and set line color to turquoise.
      //stroke(64, 128, 128, 255);
      stroke(0, 0, 0, 60);
    }

    // Loop through all circles
    for (int k=0;k< count;k++) {
      // If the circles are close...
      if ( sq(e[j][0] - e[k][0]) + sq(e[j][1] - e[k][1]) < sq(diam) ) {
        
        float x1 = e[j][0];
        float x2 = e[k][0];
        float y1 = e[j][1];
        float y2 = e[k][1];
        
        float distance = sqrt(pow(abs(x2-x1),2) + pow(abs(y2-y1),2));
        //println(distance);
        
        float red = (255*(distance/(canvas_size*0.20)*100));
        float green = 255-(255*(distance/(canvas_size*0.15)*100));
        float blue = 0;
        float alpha = 130-(distance/(canvas_size*0.26)*100);
        //println(alpha);
        //stroke(red, green, blue, alpha);
        stroke(0, 0, 0, alpha);
        /*
        if (distance < (canvas_size*0.25)) {
          stroke(red, 255, 0, 150);
        } 
        if (distance < (canvas_size*0.2)) {         
          stroke(0, 255, 0, 150);
        }
        */
        // Stroke a line from current circle to adjacent circle
        line(x1, y1, x2, y2);
      }
    }
    // Turn off stroke/border
    noStroke();      
    // Draw dot in center of circle
    rect(e[j][0]-ds, e[j][1]-ds, ds*2, ds*2);
  }
}