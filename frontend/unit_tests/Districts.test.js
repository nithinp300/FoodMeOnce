import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import Districts from "../src/components/Districts";

configure({ adapter: new Adapter() });

describe("Districts test", function() {
  let querystring = {
    search: "?page=1"
  };

  it("Districts doesn't have any data at first render", function() {
    const root = shallow(<Districts location={querystring} />);
    assert.equal(root.state("districts").length, 0);
  });

  it("Districts loads correctly from api", function(done) {
    const root = shallow(<Districts location={querystring} />);
    waitUntil(() => root.state("districts").length > 0).then(() => {
      assert.equal(root.state("districts").length, 8);
      done();
    });
  });
});
