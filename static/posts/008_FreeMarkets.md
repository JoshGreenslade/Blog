title: Project 008 - Free Markets
subtitle: Where we realise that things only have value if we all believe they do.
date: 2020-10-07
author: Josh
category: python, simulation
featureimage: /static/img/008_Bazzar.jpg
pagename: 008_FreeMarkets


Several years ago, I came across [this article](../files/008_Emergent_Economies_for_Role_Playing_Game.pdf).

[^1]: **I'm rehosting this here, as the paper is from 2010 and was difficult to find online. Get in contact if you want this taken down!**

### Writing blogposts in Markdown

Previously, every blog post I wrote was written in `HTML`. 
This meant every paragraph had to be tagged, all the links had to be formatted correctly, and stylistic choices I had needed to be hard coded in, all the titles and things had to be changed, __and__ every link to that page had to be manually edited and moved around each time I wanted to add a new post!

All in all, about as much of my time was spent formatting the bloody thing as writing it.

Now I use [Flask-Flatpages](https://flask-flatpages.readthedocs.io/en/latest/) to automatically render `markdown` files into `HTML`.
I just write my post in a markdown and then `Flask-Flatpages` takes care of the rest.

What used to look like this

    <p>Finally, after a few weeks of work, here is the result!</p>
    <img src="../img/Blog_006_NextPass.gif" alt="" class="border-all" />

    <h3 class="section-title">How does it work?</h3>
    <p>The board I uesd was an ESP8266 NodeMCU V1.0 ESP-12E WiFI Module.</p>
    <p>
    On first startup, the code makes a request to
    <a
    class="link"
    href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/"
    >the open notify ISS Location API</a
    >

Now looks like this

    Finally, after a few weeks of work, here is the result!
    ![alt text](../static/img/Blog_006_NextPass.gif)

    ### How does it work?

    The board I used was an ESP8266 NodeMCU V1.0 ESP-12E WiFI Module
    On first startup, the code makes a request to 
    [the open notify ISS Location API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)

And I don't have to worry about any programming or formatting or `HTML` or `CSS`! 
Which makes it a hell of a lot easier to write these posts!

### Programatically generating content

But that's not all. 
Because `markdown` scripts can have metadata as attributes.
Which means I can now _dynamically_ generate all those blog post cards you saw in the home page, included the _Featured Post_ one!

After adding some metadata tags to my posts written in `markdown`, I built a small function that takes in the metadata for a blog post (things like the title, date, featured image ect.), and automatically builds a new card based on a pre-defined `HTML` template I also created.

Which means that the code for generating those title cards on the index page has gone from this

    <a href="posts/01_WebPage.html">
    <div id="card1" class="card">
    <img src="./img/Blog_001_MainImage.PNG" alt="" />
    <div class="card-content">
    <p class="meta-info">Jul 28th - Josh</p>
    <h2 class="card-title">
    Project 005: Homepage
    </h2>
    <p>
    I am really good at <i>starting</i> projects.
    I am also really bad at finishing them. Most of them barely got off the ground...
    </p>
    </div>
    </div>
    </a>
    <a href="posts/02_ISSTracker.html">
    <div id="card2" class="card">
    <img src="./img/Blog_006_Overhead.gif" alt="" />
    <div class="card-content">
    <p class="meta-info">Aug 29th - Josh</p>
    <h2 class="card-title">Project 006: ISS Tracker</h2>
    <p>
    Can't track my movements if I'm tracking your movements first!
    </p>
    </div>
    </div>
    </a>

To this:

    {{ generatePostCard('006_ISSTracker', size='normal') | safe }}
    {{ generatePostCard('005_WebPage', size='normal') | safe }}


Just look at those savings! I no longer have to change the links, the images, the meta-info, the card title, the introductory paragraph; it's all done automatically by just pointing to the page I want to create a title card from!

By moving this to a programatic method, it means I no longer have to worry about writing huge pages of `HTML`. I can just write a few functions that generate little blocks of `HTML` which get inserted where I want them! Rather than writing a web-page, I can _theoretically_ change my entire homepage to look something like this

    generateTitle(subtitle='Now avaliable in Color!')
    generateNavBar()
    generateShowcase(featuredPost='007_WebPageV2')
    recentPosts = generateRecentPosts(posts=['007_WebPageV2',
                               '006_ISSTracker',
                               '005_WebPage'])
    aboutMe = generateAboutMe()
    layoutSplitHorizontal(fraction=[0.66, 0.33],
                          content=[recentPosts, 
                                   aboutMe])
    generateFooter()

and mix and match this up how I want! This is definitely overkill for now though, but maybe in the future =) 

### Comments

You'll also note at the bottom of this page we now have a comments section!
Please do feel free to test it out by leaving comments!


_I absolutely couldn't have done any of this without the [excellent tutorial](https://vkaustubh.github.io/blog/geek/2020-02-23-blogging-with-flask.html) written by Kaustubh Vaghmare. He is a far superior teacher than I am, so give his page a read and a like if you want to copy what i've done here_. 