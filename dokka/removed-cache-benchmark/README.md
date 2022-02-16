Gradle `dokkaHtmlMultiModule` task benchmarks for Dokka with various caches removed from `JvmDependenciesIndexImpl`

* `1.6.10.25-clean` - master, baseline
* `1.6.10.26-clean` - `rootCache` removed (main culprit)
* `1.6.10.27-clean` - `rootCache` + `lastClassSearch` removed
* `1.6.10.28-clean` - `rootCache` + `lastClassSearch` + `packageCache` removed

Benchmarks run on `Intel i7-11800H` (SSD `SAMSUNG MZVL21T0HCLR-00BL7`) with no additional load