import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/';
import "./global.css";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Navigation />
    </>
  );
}