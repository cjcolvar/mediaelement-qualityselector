# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'mediaelement-qualityselector/version'

Gem::Specification.new do |gem|
  gem.name          = "mediaelement-qualityselector"
  gem.version       = Mediaelement::Qualityselector::VERSION
  gem.authors       = ["Chris Colvard", "Phuong Dinh"]
  gem.email         = ["cjcolvar@indiana.edu", "pdinh@indiana.edu"]
  gem.description   = %q{A plugin for MediaElement player that lets user pick different stream quality from within the player}
  gem.summary       = %q{Quality selector plugin for MediaElement player}
  gem.homepage      = ""

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
