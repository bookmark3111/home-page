/* eslint-disable no-console */
import sharp from 'sharp';
import { encode } from 'blurhash';
import fs from 'node:fs';

const IMAGES_PATH = 'src/config/images.json';
const SCHEDULE_PATH = 'src/config/schedule.json';
const TimeLine_PATH = 'src/config/timeline.json';
const Links_PATH = 'src/config/links.json';
const Site_PATH = 'src/config/site.json';
const THUMBNAILS_PATH = '';

async function update() {
  const images = JSON.parse(fs.readFileSync(IMAGES_PATH).toString());
  console.info('Updating `images.json`...');
  fs.writeFileSync(IMAGES_PATH, JSON.stringify(images), 'utf8');

  const schedule = JSON.parse(fs.readFileSync(SCHEDULE_PATH).toString());
  console.info('Updating `schedule.json`...');
  fs.writeFileSync(SCHEDULE_PATH, JSON.stringify(schedule), 'utf8');

  const timeline = JSON.parse(fs.readFileSync(TimeLine_PATH).toString());
  console.info('Updating `timeline.json`...');
  fs.writeFileSync(TimeLine_PATH, JSON.stringify(timeline), 'utf8');

  const links = JSON.parse(fs.readFileSync(Links_PATH).toString());
  console.info('Updating `links.json`...');
  fs.writeFileSync(Links_PATH, JSON.stringify(links), 'utf8');

  const site = JSON.parse(fs.readFileSync(Site_PATH).toString());
  console.info('Updating `site.json`...');
  fs.writeFileSync(Site_PATH, JSON.stringify(site), 'utf8');
  
  console.info('Done.');
}
