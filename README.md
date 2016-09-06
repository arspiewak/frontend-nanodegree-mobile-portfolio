# Website Performance Optimization portfolio project <br><small>by Alan Spiewak (arspiewak)</small>
**For the README file originally distributed with this** `frontend-nanodegree-mobile-portfolio` **project, please see file [OLDREADME.MD](OLDREADME.md)**

## 0. Hosting, access, and results

My implementation of the portfolio site is run as a GitHub page instead of running a localhost server. This should simplify the setup for evaluating the project. To run the project, access http://arspiewak.github.io/frontend-nanodegree-mobile-portfolio/index.html . The repository is at https://github.com/arspiewak/frontend-nanodegree-mobile-portfolio .

### Rejected hosting options

My PageSpeed score would be higher if I had specified caching strategies (especially `max-age` and `public`) in the HTML headers attached to my resource files by the page server. That can be specified for HTML files with the `<meta http-equiv="">` tag, but testing showed it had no impact on PageSpeed. Cache control needed to be implemented on resource files, and that can only be configured on the server. I did not want to spend the time learning how to run a server (I plan to learn that later within the Full Stack Nanodegree), so I had to let that optimization go.

While it's not a hosting option, I should mention that I plan to learn `gulp` and use it to streamline my builds, but I didn't spend the time for its learning curve for this project. For now, I've just been devising shell scripts to automate certain tasks (merging `master` with `gh-pages` and pushing commits up to GitHub, optimizing image files, etc.). The shell scripts can be found in the directory from which they are executed, and they have a null extension.

### Overall results

Three metrics are required in the Project Rubric. The values I have measured for them are:

1. **PageSpeed Index**. For the initial page, `index.html`, my final score was 96 for mobile and 97 for Desktop. The rubric goal is at least 90.
2. **Frame Rate**. The frame rate during scrolling on `pizza.html` (measured by the timeline of DevTools) is hard to quantify without developing analysis tools for the timeline file (above my pay grade). What I can observe from my test is that in about 350 frames of scrolling, only five showed as pink "long frames" in the FPS ribbon. The average scripting times per frame displayed in the console log were all below 1 ms. What the timeline reveals is that scripting is a tiny fraction of frame processing - the timing is dominated by the fact the GPU is pegged (running constantly) during scrolling, and raster processing is running almost as much. Hand sampling shows that my frame rate is mostly at or above the goal of 60 FPS.
3. **Resize Time**. Resize times reported in the console log (in 50 tests) ranged from 0.215 ms to 0.295 ms, averaging 0.2451 ms. The rubric goal is less than 5 ms.

## 1. Reducing network traffic

One of the strategies used to increase this site's speed was reducing the size of resource files and the number of files needed to produce the pages. Changes to implement this strategy follow.

### Image optimization

To resize and compress image files, I used ImageMagick (from http://www.imagemagick.org). For guidance through ImageMagick's overwhelming options, I turned to Dave Newton's article [Efficient Image Resizing with ImageMagick](https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/). In particular, Newton recommends the command line

	mogrify -path OUTPUT_PATH -filter Triangle -define filter:support=2 -thumbnail  OUTPUT_WIDTH \
		-unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 \
		-define jpeg:fancy-upsampling=off -define png:compression-filter=5 \
		-define png:compression-level=9 -define png:compression-strategy=1 \
		-define png:exclude-chunk=all -interlace none -colorspace sRGB INPUT_PATH

which he suggests defining in `.bashrc` as the `smartresize` command:

	smartresize() {
	   mogrify -path $3 -filter Triangle -define filter:support=2 -thumbnail $2 \
	   	-unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 \
		-define jpeg:fancy-upsampling=off -define png:compression-filter=5 \
	   	-define png:compression-level=9 -define png:compression-strategy=1 \
	   	-define png:exclude-chunk=all -interlace none -colorspace sRGB $1
	}

called from the command line with:

	smartresize inputfile.png 300 outputdir/

The batch file `img/resize-images` optimizes all image files and writes its output to the directory `dist/img/`. Note that files derived from both `img/` and `views/images/` are written to `dist/img/`. I append the output width in pixels to the output file name so I can keep multiple sizes of the same picture in one directory.

I also used `srcset` lists in the `img` tags for the larger images in the project. With the `sizes` attribute, `srcset` lets the browser request smaller versions of the same picture based on factors like viewport size and network performance.

In the pizza project, the sliding background pizzas used a special smaller image file so that redrawing them within 60 fps would be based on a smaller dataset than the foreground (menu) pizza images. I didn't test whether this indeed reduced redraw times.

### Inlining CSS and Javascript

For all the HTML files that referenced it, I inlined the `print.css` file, judging that it is small enough to parse visually and can be cut-and-pasted into the markup files should it ever change. It enlarges the HTML file by a small enough chunk that download performance would not be impacted. If it were larger, I'd choose whether to load it based on a media query (`="print"`), but it's simpler this way.

I also inlined `style.css` for `index.html`, but I didn't like doing it. It is minified (see below), which makes it easier to overlook when reading `main.html`, but inlining makes it much harder to keep in sync with the other pages in the project. I only did it because I was two points short on PageSpeed and I couldn't see any other strategies short of diving into hosting configurations. In a real project I'd stick with the easier-to-maintain non-inlined choice.

A portion of `views/js/main.js` was also inlined into `pizza.html`. But as explained below the purpose was to split above- and below-the-fold processing, not to reduce network traffic.

### Minification

CSS scripts `css/style.css`, `views/css/bootstrap-grid.css`, and `views/css/style.css` were minified to `dist/css` using the `npm` package `cssnano-cli` (found [here](https://www.versioneye.com/nodejs/cssnano-cli/1.0.0), documented [here](http://cssnano.co/)).

Only one javascript file, `views/js/main.js` was minified to `dist/js`, using `closure-compile` (from [here](https://developers.google.com/closure/compiler/docs/gettingstarted_app), documented [here](https://developers.google.com/speed/articles/compressing-javascript)). I used the `SIMPLE_OPTIMIZATIONS` setting, as some of the code for pizza "sliders" had been inlined without minification, and I didn't want global variable names to be mangled.

### Rejected network-traffic options

It would have been possible to minify the HTML files in this project, but we seemed to do OK without it. Debugging problems would be harder unless the support for source mapping to the original file is fantastic (I haven't investigated this). Similarly, I chose not to minify `style.css` except for `index.html`.

I did not change the original design of serving the first three thumbnails for `index.html` from Google's development server `https://lh6.ggpht.com`. In general, I'd rather have my resources on the same server if possible (if the user can get to one resource they all should be reachable, and I might be able to optimize the files). But without consulting the project's designer/architect I don't know why that source was used, so changing it would be a bad idea.

## 2. Delaying above-the-fold loads and processing

For the pages that use Google analytics, I found an [updated JavaScript tracking snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/) that loads `analytics.js` asynchronously, getting it out of the critical rendering path.

In the pizzeria page, all of the randomly generated pizza descriptions appear below the fold. The only products of `main.js` visible in the initial render/paint are the sliding pizzas. So I inlined the generation and painting for those images at the end of `index.html`, and made loading the rest of `main.js` asynchronous. Its load was moved to the end of the HTML file to get it out of the way of DOM rendering as much as possible.

In addition, the generation of the pizza descriptions below the fold was encapsulated in a function and queued to be run on the load event. This was done to prioritize HTML rendering.

## 3. Refactoring JavaScript (`main.js`) for higher performance

Probably the biggest gain in `main.js` performance came from moving DOM queries out of all processing loops. As each loop is done to set some DOM property for multiple objects, reading a DOM value in the loop forces the browser to recalculate "everything" to be sure the value it has is accurate. Without this continual recalculation, all the updates can be batched and applied in one render/paint. There were probably a half-dozen such loops, and this fix worked wonders.

In order to generate random names for pizzas (in the form "The *\<adjective> \<noun>*"), the algorithm first selects a type for each. (Nouns might be animals, professions, places, etc.; adjectives could be whimsical, dark, apocalyptic, etc.) Each type has an array of words to choose (animals could be flamingo, hedgehog, owl, ...), and the type arrays have different numbers of items. The original scripting used a complicated system of functions, switches, string comparisons, and assigning type-arrays to return variables. To simplify processing, I generate each part of speech from a two-dimensional array of items. The first dimension is the type (animal, place, ...) and the second is the choices that belong to that type. Four random numbers are generated, as before, but I just use them directly as indexes to the arrays. This simplified processing reduces the size of the code and reduces its time to execute substantially.

Pizza ingredients are stored in several arrays, one for each type (meat, non-meat, cheese, ...). Originally all type arrays were properties of a single `pizzaIngredient` object. I dispensed with the containing object, making each ingredient array a global variable. I also calculated the length of each array on definition (they're never changed by the script) so loops don't have to keep looking the length property up. These changes saved approximately 1200-4700 property-reference operations during pizza generation.

I folded a number of functions together, inlining one-line functions and eliminating unnecessary call stacks, streamlining pizza generation, resizing, and slider redrawing. I also revised the generation of the `pizza` string (essentially the name and ingredient list) to reduce the number of "+=" concatenations.

When the user moves the size slider, the original code ran a complicated algorithm to resize each pizza image. I set the new size once for all pizzas (they're all the same), and instead of calculating a pixel-unit size based on the window size I specify the new size in percent terms, making the sizing algorithm trivial. CSS processing figures out the details much faster.

The original code created an array of 200 background images of pizzas, which slide on horizontal virtual tracks when the page is scrolled. By my calculation, on a double-height pair of monitors no more than 10 rows of sliders are visible (a maximum of 8 images/row), so I reduced the size of the array to 80, reducing loop computation for each frame and reducing the size of the DOM, which speeds up per-frame rendering.

### Rejected refactor options

Nouns and adjectives used to generate pizza names are stored in all lowercase form. When a new pizza name is built, each element is processed by a `capitalize` method, which uppercases its first character. I considered capitalizing the data as stored in the arrays and removing the `capitalize` method, but testing showed that would only save about 10 ms for every 10,000 executions. Not worth implementing.

As I did with the ingredient arrays, I could have calculated and stored the length of each noun/adjective type array in a global array. But that would only save two property references for each of 198 generated pizzas, and the savings seemed insignificant.

It would be possible when generating the "sliding" pizzas to calculate how many rows are needed instead of my fixed set of 10. We could also detect when fewer than 8 pizzas are visible per row. This way we would reduce the slider array further to only the pizzas that are visible. The trouble is that the window can be resized, and the whole set of sliders would have to be regenerated each time the window's resized. It's not a huge effort to work out, but I judged that it wouldn't result in a discernable difference. That assumption is probably worth testing.