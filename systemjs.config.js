(function (global) {

    var ngVer = '@2.0.0-rc.3'; // lock in the angular package version; do not let it float to current!
    var routerVer = '@3.0.0-alpha.7'; // lock router version
    var formsVer = '@0.1.1'; // lock forms version

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs': 'node_modules/rxjs',
        'angular2-modal': 'node_modules/angular2-modal',
        'angular2-modal/platform-browser': 'node_modules/angular2-modal/platform-browser',
        'angular2-modal/package.json': 'node_modules/angular2-modal/package.json',
        'ng2-toastr': 'node_modules/ng2-toastr'
        // 'immutable': 'node_modules/immutable/dist'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            main: 'main.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'angular2-in-memory-web-api': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'angular2-modal': { defaultExtension: 'js', main: 'index' },
        'angular2-modal/platform-browser': { defaultExtension: 'js', main: 'index' },
        'angular2-modal/plugins/bootstrap': { defaultExtension: 'js', main: 'index' },
        'angular2-modal/plugins/vex': { defaultExtension: 'js', main: 'index' },
        'ng2-toastr' : { defaultExtension: 'js', main: 'index' }
        // 'immutable': {
        //     main: 'immutable.js',
        //     defaultExtension: 'js'
        // }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    // No umd for router yet
    packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };
    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);
