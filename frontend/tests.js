import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import Districts from "./src/components/Districts";
import Legislations from "./src/components/Legislations";
import Representatives from "./src/components/Representatives";
import DistrictInstance from "./src/components/InstancePages/DistrictInstance";
import RepresentativeInstance from "./src/components/InstancePages/RepresentativeInstance";
import LegislationInstance from "./src/components/InstancePages/LegislationInstance";

configure({ adapter: new Adapter() });

describe("Districts test", function() {
  let querystring = {
    pathname: "/Districts",
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

describe("Legislations test", function() {
  let querystring = {
    pathname: "/Legislations",
    search: "?page=1"
  };

  it("Legislations doesn't have any data at first render", function() {
    const root = shallow(<Legislations location={querystring} />);
    assert.equal(root.state("legislations").length, 0);
  });

  it("Legislations loads correctly from api", function(done) {
    const root = shallow(<Legislations location={querystring} />);
    waitUntil(() => root.state("legislations").length > 0).then(() => {
      assert.equal(root.state("legislations").length, 8);
      done();
    });
  });
});

describe("Representatives test", function() {
  let querystring = {
    pathname: "/Representatives",
    search: "?page=1"
  };

  it("Representatives doesn't have any data at first render", function() {
    const root = shallow(<Representatives location={querystring} />);
    assert.equal(root.state("representatives").length, 0);
  });

  it("Representatives loads correctly from api", function(done) {
    const root = shallow(<Representatives location={querystring} />);
    waitUntil(() => root.state("representatives").length > 0).then(() => {
      assert.equal(root.state("representatives").length, 8);
      done();
    });
  });
});

describe("District Instance test", function() {
  const match = {
    params: {
      id: "1"
    }
  };
  it("District Instance page doesn't have any data at first render", function() {
    const root = shallow(<DistrictInstance match={match} />);
    assert.equal(root.state("district").id, null);
  });

  it("District Instance page loads correctly from api", function(done) {
    const root = shallow(<DistrictInstance match={match} />);
    waitUntil(() => root.state("district").id != null).then(() => {
      assert.equal(root.state("district").id, 1);
      assert.equal(root.state("district").state, "Alabama");
      assert.equal(root.state("district").congressional_district, "01");
      done();
    });
  });
});

describe("Representative Instance test", function() {
  const match = {
    params: {
      id: "F000467"
    }
  };
  it("Representative Instance page doesn't have any data at first render", function() {
    const root = shallow(<RepresentativeInstance match={match} />);
    assert.equal(root.state("representative").id, null);
  });

  it("Representative Instance page loads correctly from api", function(done) {
    const root = shallow(<RepresentativeInstance match={match} />);
    waitUntil(() => root.state("representative").id != null).then(() => {
      assert.equal(root.state("representative").id, "F000467");
      assert.equal(root.state("representative").full_name, "Abby Finkenauer");
      done();
    });
  });
});

describe("Legislation Instance test", function() {
  const match = {
    params: {
      id: "80"
    }
  };
  it("Legislation Instance page doesn't have any data at first render", function() {
    const root = shallow(<LegislationInstance match={match} />);
    assert.equal(root.state("legislation").id, null);
  });

  it("Legislation Instance page loads correctly from api", function(done) {
    const root = shallow(<LegislationInstance match={match} />);
    waitUntil(() => root.state("legislation").id != null).then(() => {
      assert.equal(root.state("legislation").id, "80");
      assert.equal(
        root.state("legislation").short_title,
        "Agriculture Improvement Act of 2018"
      );
      done();
    });
  });
});
