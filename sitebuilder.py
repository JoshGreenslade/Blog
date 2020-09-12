import sys
import utilities

from flask import Flask, render_template, render_template_string
from flask_flatpages import FlatPages
from flask_frozen import Freezer
from flask import url_for

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_ROOT = './static/posts'
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
app.config.from_object(__name__)

pages = FlatPages(app)

freezer = Freezer(app)


@freezer.register_generator
def pagelist():
    for page in pages:
        yield url_for('page', path=page.path)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/contact.html')
def contact():
    return render_template('contact.html')


@app.route('/posts/<path:path>.html')
def page(path):
    print("page function running")
    page = pages.get_or_404(path)
    return render_template('blogpost.html', page=page)


@app.context_processor
def postcards():
    def generatePostCard(post='005_WebPage',
                         size='normal'):
        meta = utilities.getMarkdownMeta(f'./static/posts/{post}.md')
        if size == 'normal':
            template = 'postcard-normal.html'
        elif size == 'large':
            template = 'postcard-large.html'
        return render_template(template, meta=meta)

    return dict(generatePostCard=generatePostCard)


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'build':
        freezer.freeze()
    else:
        app.run(host='0.0.0.0', port=5001)
