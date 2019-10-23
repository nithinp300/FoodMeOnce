import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import LegislationInstance from "../src/components/InstancePages/LegislationInstance";

configure({ adapter: new Adapter() });

describe("District Instance test", function() {
  const match = {
    params: {
      id: "2"
    }
  };
  it("District Instance page doesn't have any data at first render", function() {
    const root = shallow(<LegislationInstance match={match} />);
    assert.equal(root.state("legislation").id, null);
  });

  it("District Instance page loads correctly from api", function(done) {
    const root = shallow(<LegislationInstance match={match} />);
    waitUntil(() => root.state("legislation").id != null).then(() => {
      assert.equal(root.state("legislation").id, "2");
      assert.equal(
        root.state("legislation").short_title,
        "Agriculture Improvement Act of 2018"
      );
      done();
    });
  });
});
