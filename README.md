## Website Performance Optimization portfolio project <br>by Alan Spiewak (arspiewak)
**For the README file originally distributed with this** `frontend-nanodegree-mobile-portfolio` **project, please see file [`OLDREADME.MD`](OLDREADME.md)**

### Hosting

My implementation of the portfolio site is run as a GitHub page instead of running a localhost server. This should simplify the setup for evaluating the project.

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

The batch file `img/resize-images` optimizes all image files and writes its output to the directory `dist/img/`. Note that files derived from both `img/` and `views/images/` are written to `dist/img/`.