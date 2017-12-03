import gulp from 'gulp'
import sass from 'gulp-ruby-sass'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import vueify from 'vueify'
import source from 'vinyl-source-stream'
import { spawn } from 'child_process'

const node_server = './controllers/'

// TODO: nodemonを使い、自動化を検討
// let node
gulp.task('server', () => {
   /* if(node){
      node.kill()
   }
   node = spawn('babel-node', ['./controllers/route.js'], { presets: 'es2015', stdio: 'inherit' })
   node.on('close', (code) => {
      if(code === 8){
         gulp.log('Error detected, waiting for changes')
      }
   }) */
})

gulp.task('default', ['server'])
