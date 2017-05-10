import React from 'react';
import Relay from 'react-relay';
import { Link, withRouter } from 'react-router';
import LD from './LD';
import UI from './UI';
import resolvePath from './resolvePath';

// Trick Webpack Into Deeper Rebuild when Schema is Updated.
module.exports = { React, Relay, Link, LD, UI, withRouter, resolvePath };
