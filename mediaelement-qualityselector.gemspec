# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'mediaelement-qualityselector/version'

Gem::Specification.new do |gem|
  gem.name          = "mediaelement-qualityselector"
  gem.version       = Mediaelement::Qualityselector::VERSION
  gem.authors       = ["Chris Colvard"]
  gem.email         = ["cjcolvar@indiana.edu"]
  gem.description   = %q{TODO: Write a gem description}
  gem.summary       = %q{TODO: Write a gem summary}
  gem.homepage      = ""

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
