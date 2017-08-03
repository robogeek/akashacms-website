
'use strict';

const util    = require('util');
const akasha  = require('akasharender');

const config = new akasha.Configuration();

config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    });

config
    .addLayoutsDir('layouts')
    .addPartialsDir('partials');

config
    .addDocumentsDir('documents')
    .addDocumentsDir({
        src: 'node_modules/akasharender/guide',
        dest: 'akasharender',
        baseMetadata: {
            bookHomeURL: "/akasharender/toc.html"
        }
    })
    .addDocumentsDir({
        src: 'node_modules/mahabhuta/guide',
        dest: 'mahabhuta',
        baseMetadata: {
            bookHomeURL: "/mahabhuta/toc.html"
        }
    })
    .addDocumentsDir({
        src: 'node_modules/epub-guide/documents',
        dest: 'epubtools',
        baseMetadata: {
            bookHomeURL: "/epubtools/toc.html"
        }
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-base/guide',
        dest: 'plugins/base'
    })
    .addDocumentsDir({
        src: 'node_modules/akasharender/built-in-guide',
        dest: 'plugins/built-in'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-booknav/guide',
        dest: 'plugins/booknav'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-blog-podcast/guide',
        dest: 'plugins/blog-podcast'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-breadcrumbs/guide',
        dest: 'plugins/breadcrumbs'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-document-viewers/guide',
        dest: 'plugins/document-viewers'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-embeddables/guide',
        dest: 'plugins/embeddables'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-external-links/guide',
        dest: 'plugins/external-links'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-footnotes/guide',
        dest: 'plugins/footnotes'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-tagged-content/guide',
        dest: 'plugins/tagged-content'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-theme-bootstrap/guide',
        dest: 'plugins/theme-bootstrap'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-affiliates/guide',
        dest: 'plugins/affiliates'
    })
    .addDocumentsDir({
        src: 'node_modules/akasharender-epub/guide',
        dest: 'plugins/akasharender-epub'
    })
    .addDocumentsDir({
        src: 'node_modules/akashacms-adblock-checker/guide',
        dest: 'plugins/adblock-checker'
    });

config.rootURL("https://akashacms.com");

config
    .use(require('akashacms-theme-bootstrap'))
    .use(require('akashacms-base'))
    .use(require('akashacms-breadcrumbs'))
    .use(require('akashacms-booknav'))
    .use(require('akashacms-embeddables'))
    .use(require('akashacms-external-links'))
    .use(require('akashacms-footnotes'))
    .use(require('akashacms-blog-podcast'))
    .use(require('epub-website'));

config.plugin("akashacms-base").generateSitemap(config, true);

config.plugin("akashacms-external-links")
    .setTargetBlank(config, true)
    .setShowFavicons(config, "before");

config
    .addFooterJavaScript({
        href: "/vendor/jquery/jquery.min.js"
    })
    .addFooterJavaScript({
        href: "/vendor/bootstrap/js/bootstrap.min.js"
    })
    .addStylesheet({
        href: "/vendor/bootstrap/css/bootstrap.min.css"
    })
    .addStylesheet({
        href: "/vendor/bootstrap/css/bootstrap-theme.min.css"
    })
    .addStylesheet({
        href: "/readable.min.css"
    })
    .addStylesheet({
        href: "/style.css"
    });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true
});

config.plugin('akashacms-blog-podcast')
    .addBlogPodcast(config, "news", {
        rss: {
            title: "AkashaCMS News",
            description: "Announcements and news about the AkashaCMS content management system",
            site_url: "http://akashacms.com/news/index.html",
            image_url: "http://akashacms.com/logo.gif",
            managingEditor: 'David Herron',
            webMaster: 'David Herron',
            copyright: '2015 David Herron',
            language: 'en',
            categories: [ "Node.js", "Content Management System", "HTML5", "Static website generator" ]
        },
        rssurl: "/news/rss.xml",
        rootPath: "news",
        matchers: {
            layouts: [ "blog.html.ejs" ],
            path: /^news\//
        }
    });

config.plugin('akashacms-blog-podcast')
    .addBlogPodcast(config, "howto", {
        rss: {
            title: "AkashaCMS Tutorials",
            description: "Tutorials about using the AkashaCMS content management system",
            site_url: "http://akashacms.com/howto/index.html",
            image_url: "http://akashacms.com/logo.gif",
            managingEditor: 'David Herron',
            webMaster: 'David Herron',
            copyright: '2015 David Herron',
            language: 'en',
            categories: [ "Node.js", "Content Management System", "HTML5", "HTML5", "Static website generator" ]
        },
        rssurl: "/howto/rss.xml",
        rootPath: "howto",
        matchers: {
            layouts: [ "blog.html.ejs" ],
            path: /^howto\//
        }
    });

// console.log('before prepare');
// console.log(util.inspect(config));

config.prepare();

module.exports = config;
