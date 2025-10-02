NodeJS backend to generate PowerPoint presentations

Sample request:
{
  "settings": {
    "slideRatio": "16x9 | 4x3",
    "unit": "px | in | cm",
    "titleStyle": {
      "fontFamily": "font family",
      "fontSize": 32,
      "fontColor": "#FFFFFF"
    }
  },
  "songs": [
    {
      "title": "Title",
      "text1": "english lyrics",
      "text2": "hindi lyrics",
      "settings": {
        "separation": {
          "symbol": "\n\n",
          "lines": null
        },
        "orientation": "stacked | sideBySide",
        "stanzas": [],
        "padding": {
          "left": 12,
          "top": 12,
          "right": 12,
          "bottom": 12
        },
        "text1Style": {
          "fontFamily": "font family",
          "fontSize": 32,
          "fontColor": "#FFFFFF"
        },
        "text2Style": {
          "fontFamily": "font family",
          "fontSize": 32,
          "fontColor": "#FFFFFF"
        },
        "background": {
          "color": "#000000",
          "opacity": "1"
        }
      }
    },
    {
      "title": "Title 2",
      "text1": "english lyrics",
      "text2": null,
      "settings": {
        "separation": {
          "symbol": null,
          "lines": 1
        },
        "orientation": "stacked | sideBySide",
        "stanzas": [ 1, 5, 7 ],
        "padding": {
          "left": 12,
          "top": 12,
          "right": 12,
          "bottom": 12
        },
        "text1Style": {
          "fontFamily": "font family",
          "fontSize": 32,
          "fontColor": "#FFFFFF"
        },
        "text2Style": {
          "fontFamily": "font family",
          "fontSize": 32,
          "fontColor": "#FFFFFF"
        },
        "background": {
          "color": "#000000",
          "opacity": "0.5"
        }
      }
    }
  ]
}
