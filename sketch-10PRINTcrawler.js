
var mazeType="diagonal";
var newMaze = false;

//show what percentage value on the range input for each maze constructor element
function slashPercentage() {
    var CHR$1 = String.fromCharCode(9585),
        CHR$2 = String.fromCharCode(9586),
        slashInput = Number(document.getElementById("slash-input").value),
        slashesValues = document.getElementById("slashes-percentages");
    slashesValues.innerHTML = "" + Math.round( (0.5 - slashInput) * 100 ) + "%: " + CHR$1 + " &nbsp; &amp; &nbsp; " + Math.round( (0.5 + slashInput) * 100) + "%: " + CHR$2 + " &nbsp; &nbsp; ";
}
    
maze10PRINT = function(p) {
    p.CHR$index = 0;
    p.CHR$list = [];
    p.symbolSize = 16;
    p.mazecrawl = false;
    p.mazepath = [];
    p.topCrawl;
    p.mazeColour = [];
    p.colour;
    
    function generateColour() {
        //colour hues for HSL system: 180 (cyan) to 290 (violet) // 50(dark orange) to 160 (Aquamarine)
        for (colour = 180; colour < 290; colour += (110 / (p.floor(p.windowWidth / p.symbolSize) ))  ) {
            p.mazeColour.push('hsl('+ p.floor(colour) +', 50%, 50%)');
        }
    }
    function resetMaze() {
        //p.CHR$list = []; //hard reset, erase previous maze
        p.CHR$index = 0;
        p.mazecrawl = false;
        p.topCrawl = null;
        p.mazepath = [];
        p.mazeColour = [];
        p.colour = null;
        p.x = 0;
        p.y = 0;
        generateColour();
    }
    
    function crawler(x, y) {
        //check neighbors for next craw
                //check what character is used on each cell on particular position
                //check where to go (only 2 directions) but it goes only in one direction
                //check if next cell was visited, if not go otherwise go to the other direction
        let nextPos;
        //test if craw on certain area finishes, go to Maze Top and crawl again on next cell
        if (p.topCrawl == true) {
            //check where is the next crawl
            for (let pos of p.CHR$list) {
                if (pos.y == 0 && pos.visitedUP == false) {
                    x = pos.x;
                    y = 0;
                    break;
                }
            }
            //select the colour to crawl each section
            p.colour = p.random(p.mazeColour);
        }
        if (p.mazepath.length == 0) {
            p.topCrawl = true;
            //select the colour to crawl each section
            p.colour = p.random(p.mazeColour);
        }
        
        let currentPos = cellPos(x, y);
        for (let i = 0; i < p.CHR$list.length; i++) {
            //CHAR1 = \
            if (p.CHR$list[i].CHAR1 == true && p.CHR$list[i].x == currentPos.x && p.CHR$list[i].y == currentPos.y) {
                
                //0. start crawling maze from the top
                if (p.topCrawl == true && p.CHR$list[i].visitedUP == false && p.CHR$list[i].y == 0) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x + p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                        
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("0. ", p.CHR$list[i], p.x, p.y);
                
                }
                //crawling inside the maze
                //1. previous CHAR1, visitedUP, positioned on left of current not visited CHAR1
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedDW == false &&p.mazepath[0].visitedUP == true && p.mazepath[0].x < p.CHR$list[i].x) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x, y + p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("1. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //2. previous CHAR1, visitedUP, positioned bellow current not visited CHAR1
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedUP == true && p.mazepath[0].y > p.CHR$list[i].y) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x - p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("2. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //3. previous CHAR1, visitedDW, positioned above current not visited CHAR1
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedDW == true && p.mazepath[0].y < p.CHR$list[i].y) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x + p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("3. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //4. previous CHAR1, visitedDW, positioned right of current not visited CHAR1
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedDW == true && p.mazepath[0].x > p.CHR$list[i].x) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    
                    //next cell position
                    nextPos = cellPos(x, y - p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("4. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //5. previous CHAR2, visitedUP, positioned right of current not visited CHAR1
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedUP == true && p.mazepath[0].x > p.CHR$list[i].x) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    
                    //next cell position
                    nextPos = cellPos(x, y - p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("5. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //6. previous CHAR2, visitedUP, positioned bellow current not visited CHAR1
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedUP == true && p.mazepath[0].y > p.CHR$list[i].y) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    
                    //next cell position
                    nextPos = cellPos(x - p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("6. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //7. previous CHAR2, visitedDW, positioned above current not visited CHAR1
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedDW == true && p.mazepath[0].y < p.CHR$list[i].y) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    
                    //next cell position
                    nextPos = cellPos(x + p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("6. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //8. previous CHAR2, visitedDW, positioned left of current not visited CHAR1
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedDW == true && p.mazepath[0].x < p.CHR$list[i].x) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    
                    //next cell position
                    nextPos = cellPos(x, y + p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("8. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                
            //end CHAR1
            }
            
            //CHAR2 = /
            if (p.CHR$list[i].CHAR2 == true && p.CHR$list[i].x == currentPos.x && p.CHR$list[i].y == currentPos.y) {
                
                //0. start crawling maze from the top
                if (p.topCrawl == true && p.CHR$list[i].visitedUP == false && p.CHR$list[i].y == 0) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x - p.symbolSize, y)
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl == true
                    }
                    //console.log("0. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //crawling inside the maze
                //1. previous CHAR1, visitedUP, positioned on left of current not visited CHAR2
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedUP == true && p.mazepath[0].x < p.CHR$list[i].x) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x, y - p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("1. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //2. previous CHAR1, visitedUP, positioned bellow current not visited CHAR2
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedUP == true && p.mazepath[0].y > p.CHR$list[i].y) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x + p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                   //console.log("2. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //3. previous CHAR1, visitedDW, positioned above current not visited CHAR2
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedDW == true && p.mazepath[0].y < p.CHR$list[i].y) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x - p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("3. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //4. previous CHAR1, visitedDW, positioned on right of current not visited CHAR2
                if (p.mazepath[0].CHAR1 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedDW == true && p.mazepath[0].x > p.CHR$list[i].x) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x, y + p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("4. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //5. previous CHAR2, visitedUP, positioned on right of current not visited CHAR2
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedUP == true && p.mazepath[0].x > p.CHR$list[i].x) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x, y + p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("5. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //6. previous CHAR2, visitedUP, positioned bellow current not visited CHAR2
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedDW == false && p.mazepath[0].visitedUP == true && p.mazepath[0].y > p.CHR$list[i].y) {
                    p.CHR$list[i].visitedDW = true;
                    p.CHR$list[i].colourDW = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x + p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("6. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //7. previous CHAR2, visitedDW, positioned above current not visited CHAR2
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedDW == true && p.mazepath[0].y < p.CHR$list[i].y) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x - p.symbolSize, y);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("7. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
                //8. previous CHAR2, visitedDW, positioned on left of current not visited CHAR2
                if (p.mazepath[0].CHAR2 == true && p.CHR$list[i].visitedUP == false && p.mazepath[0].visitedDW == true && p.mazepath[0].x < p.CHR$list[i].x) {
                    p.CHR$list[i].visitedUP = true;
                    p.CHR$list[i].colourUP = p.colour;
                    p.mazepath.unshift(p.CHR$list[i]);
                    //next cell position
                    nextPos = cellPos(x, y - p.symbolSize);
                    if (nextPos != false) {
                        p.x = nextPos.x;
                        p.y = nextPos.y;
                        p.topCrawl = false;
                    } else {
                        p.topCrawl = true;
                    }
                    //console.log("8. ", p.CHR$list[i], p.x, p.y, nextPos);
                }
            }
        }
        //console.log(p.x,p.y, p.topCrawl);
    }
    
    function cellPos(x, y) {
        for (let i = 0; i < p.CHR$list.length; i++) {
            if (p.CHR$list[i].x == x && p.CHR$list[i].y == y) {
                return p.CHR$list[i];
            }
        }
        return false;
    }
    
    function symbolCHAR1(x, y) {
        this.x = x;
        this.y = y;
        this.CHAR1 = true;
        this.CHAR2 = false;
        this.visitedUP = false;
        this.visitedDW = false;
        this.colourUP;
        this.colourDW;
        
        this.display = function() {
            if (this.visitedUP) {
                p.noStroke();
                //p.fill(0, 180, 255, 100);
                p.fill(this.colourUP);
                p.triangle(this.x, this.y, this.x + p.symbolSize, this.y, this.x + p.symbolSize, this.y + p.symbolSize);
            }
            if (this.visitedDW) {
                p.noStroke();
                //p.fill(0, 180, 255, 100);
                p.fill(this.colourDW);
                p.triangle(this.x, this.y, this.x + p.symbolSize, this.y + p.symbolSize, this.x, this.y + p.symbolSize);
            }
            p.stroke(255);
            p.fill(255);
            p.line(this.x, this.y, this.x + p.symbolSize, this.y + p.symbolSize);
        }
    }
    function symbolCHAR2(x, y) {
        this.x = x;
        this.y = y;
        this.CHAR1 = false;
        this.CHAR2 = true;
        this.visitedUP = false;
        this.visitedDW = false;
        this.colourUP;
        this.colourDW;
        this.display = function() {
            if (this.visitedUP) {
                p.noStroke();
                //p.fill(0, 180, 255, 100);
                p.fill(this.colourUP);
                p.triangle(this.x, this.y, this.x, this.y + p.symbolSize, this.x + p.symbolSize, this.y);
            }
            if (this.visitedDW) {
                p.noStroke();
                //p.fill(0, 180, 255, 100);
                p.fill(this.colourDW);
                p.triangle(this.x, this.y + p.symbolSize, this.x + p.symbolSize, this.y, this.x + p.symbolSize, this.y + p.symbolSize);
            }
            p.stroke(255);
            p.fill(255);
            p.line(this.x, this.y + p.symbolSize, this.x + p.symbolSize, this.y);
        }
    }
    
    p.setup = function() {
        p.createCanvas( p.windowWidth - 32, p.windowHeight - 60);
        p.background(0);
        p.textSize(p.symbolSize);
        p.x = 0;
        p.y = 0;
        generateColour();
    }

    p.draw = function() {
        p.background(0);
        //get the range percentage values for each maze character
        var slashInput = Number(document.getElementById("slash-input").value),
            mazeValue = document.getElementsByTagName("input"),
            mazeType;
        for (let inputs in mazeValue) {
            if (mazeValue[inputs].name == "maze") {
                if (mazeValue[inputs].checked) {
                    mazeType = mazeValue[inputs].value;
                }
            }
        }
        //clicking on button reset maze
        if (newMaze == true) {
            resetMaze();
            newMaze = false;
        }
        
        
        //create maze first with 10PRINT rules
        if (p.mazecrawl == false) {
            //diagonal maze:  10 PRINT CHR$(205.5+RND(1)); : GOTO 10
            if (p.random() + slashInput < 0.5) {
                p.CHR$list[p.CHR$index] = new symbolCHAR1(p.x, p.y);
            } else {
                p.CHR$list[p.CHR$index] = new symbolCHAR2(p.x, p.y);
            }
        }
        
        //showing the selected characters for the maze
        for (let i = 0; i < p.CHR$list.length; i++) {
            try {
                p.CHR$list[i].display();
            } catch(e) {
                console.log("index: ", i, " p.CHR$list.length: ", p.CHR$list.length, e.message);
            }
        }
        
        //commence maze crawling
        if (p.mazecrawl == true) {
            crawler(p.x, p.y);
        }
        
        if (p.mazecrawl == false) {
            //next symbol position
            p.x += p.symbolSize;
            p.CHR$index += 1;
            //go to next line
            if (p.x > p.width && p.y <= p.height) {
                p.x = 0;
                p.y += p.symbolSize;
            }

            //after finish writing entire canvas, return to top and commence to craw the maze
            if (p.y > p.height) {
                p.mazecrawl = true;
                p.y = 0;
                p.CHR$index = 0;
            }
        }
        
    }
    
    p.windowResized = function() {
        p.CHR$list = [];
        resetMaze();
        p.resizeCanvas(p.windowWidth -32, p.windowHeight - 60);
    }
}


let maze10PRINTcrawler = new p5(maze10PRINT, "10PRINT");