import { Component, OnInit, Inject } from '@angular/core';

import { ActivatedRoute, Params} from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  output: string;

  public languages: string[] = ['Python', 'Java', 'C++'];
  language: string = 'Python';

  languageToMode = {
    Java: 'Java',
    'C++': 'c_cpp',
    Python: 'Python'
  };

  sessionId: string;

  defaultContent = {
    Java: `class Solution {
      public static void main(String[] args) {
        //Type your code here

      }
    }`,

    'C++': `#include <iostream>
    using namespace std;

    int main() {
      //Type your C++ code here
      return 0;
    }`,
    Python: `class Solution:
    def example():
        #write your Python code here
        `
  }

  constructor(@Inject('collaboration') private collaboration,
                private route: ActivatedRoute,
              @Inject('data') private data) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      })
  }

  initEditor() {
    ace.config.set('basePath', '/ace-builds/src-min-noconflict/ace.js');
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();

    document.getElementsByTagName('textarea')[0].focus();

    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on('change', (e) => {
        console.log('editor changes: ' + JSON.stringify(e));
        if (this.editor.lastAppliedChange != e) {
          this.collaboration.change(JSON.stringify(e));
        }
    });
    this.editor.getSession().getSelection().on('changeCursor', () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves: ' + JSON.stringify(cursor))
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void {
      this.language = language;
      this.resetEditor();
  }

  resetEditor(): void {
    this.editor.session.setMode('ace/mode/' + this.languageToMode[this.language].toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(): void {
    let userCode = this.editor.getValue();
    let data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    }
    this.data.buildAndRun(data)
        .then(res => this.output = res.text);
  }
}
