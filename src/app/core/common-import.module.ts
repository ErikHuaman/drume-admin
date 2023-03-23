import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// primeng components
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MegaMenuModule } from 'primeng/megamenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { PickListModule } from 'primeng/picklist';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { TreeModule } from 'primeng/tree';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ListboxModule } from 'primeng/listbox';
import { SliderModule } from 'primeng/slider';
import { SplitterModule } from 'primeng/splitter';
import { TreeTableModule } from 'primeng/treetable';
import { TimelineModule } from 'primeng/timeline';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ImageModule } from 'primeng/image';
import { StepsModule } from 'primeng/steps';
import { ChipsModule } from 'primeng/chips';
import { StyleClassModule } from 'primeng/styleclass';
import { CarouselModule } from 'primeng/carousel';
import { BadgeModule } from 'primeng/badge';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RatingModule } from 'primeng/rating';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ToastrModule,
  InputTextModule,
  TableModule,
  CheckboxModule,
  RadioButtonModule,
  ButtonModule,
  SplitButtonModule,
  DropdownModule,
  InputTextareaModule,
  MessagesModule,
  ConfirmDialogModule,
  MegaMenuModule,
  TieredMenuModule,
  MultiSelectModule,
  DragDropModule,
  DialogModule,
  AccordionModule,
  CalendarModule,
  ColorPickerModule,
  FileUploadModule,
  TooltipModule,
  ChartModule,
  PickListModule,
  DynamicDialogModule,
  ToastModule,
  CardModule,
  CarouselModule,
  TabViewModule,
  ProgressSpinnerModule,
  AutoCompleteModule,
  FieldsetModule,
  OverlayPanelModule,
  SkeletonModule,
  CascadeSelectModule,
  PanelModule,
  TreeModule,
  InputNumberModule,
  SidebarModule,
  TabMenuModule,
  ListboxModule,
  SliderModule,
  SplitterModule,
  TreeTableModule,
  TimelineModule,
  OrderListModule,
  TagModule,
  InputSwitchModule,
  ToolbarModule,
  SelectButtonModule,
  ImageModule,
  StepsModule,
  ChipsModule,
  StyleClassModule,
  BadgeModule,
  ScrollPanelModule,
  RatingModule,
  CKEditorModule,
];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class CommonImportModule {}
