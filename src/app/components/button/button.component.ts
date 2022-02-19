import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'PrimaryButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() color: string;
  @Output() onClick = new EventEmitter();

  constructor() {
    this.color = '#A100C9';
  }

  ngOnInit(): void {}

  onClickHandler() {
    this.onClick.emit();
  }
}
